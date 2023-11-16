import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import "../core/auth/strategies/local";
import { generateImage, retrieveJob } from "../api/runpod";
import Image, { IImage } from "../models/image";

const router: Router = Router();

router.post(
  "/generate",
  [
    check("prompt", "Prompt is required").exists(),
    check("width", "Width is required").exists(),
    check("height", "Height is required").exists(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    try {
      const generateResponse = await generateImage(
        req.body.prompt,
        req.body.width,
        req.body.height
      );
      if (generateResponse.id) {
        const new_image = await Image.create({
          jobId: generateResponse.id,
          prompt: req.body.prompt,
        });
        console.log(new_image);
        return res.status(HttpStatusCodes.OK).send({ id: new_image.jobId });
      }
    } catch (err) {
      console.log(err);
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
    }
  }
);

router.get("/all", async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  try {
    const images = await Image.find({});
    images.sort((a, b) => {
      return b.dateCreated.getTime() - a.dateCreated.getTime();
    });
    return res.status(HttpStatusCodes.OK).send(images);
  } catch (err) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

router.get("/updatePending", async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  try {
    const pending = await Image.find({ isPending: true });

    const promises: Promise<void>[] = [];
    const updatedImages: IImage[] = [];
    if (pending.length > 0) {
      for (const image of pending) {
        promises.push(
          checkJobStatus(image.jobId).then((image) => {
            if (image) {
              updatedImages.push(image);
            }
          })
        );
      }
    }
    await Promise.all(promises);
    return res.status(HttpStatusCodes.OK).send({
      remaining: pending.length - updatedImages.length,
      updated: updatedImages,
    });
  } catch (err) {
    console.log(err);
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

const checkJobStatus = async (jobId: string): Promise<IImage | null> => {
  return retrieveJob(jobId).then((response) => {
    if (
      response.status === "COMPLETED" &&
      response.output &&
      response.output.length > 0
    ) {
      const image = Image.findOneAndUpdate(
        { jobId },
        {
          isPending: false,
          url: response.output[0].image,
        },
        {
          new: true,
        }
      );
      console.log(image);
      return image;
    } else {
      return null;
    }
  });
};

export default router;
