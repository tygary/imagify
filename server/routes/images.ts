import { Request, Response, Router } from "express";
import { check, validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import "../core/auth/strategies/local";
import { generateImage, retrieveJob } from "../api/runpod";
import Image, { IImage } from "../models/image";

const router: Router = Router();

router.post(
  "/generate",
  [check("prompt", "Prompt is required").exists()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() });
    }
    try {
      const generateResponse = await generateImage(req.body.prompt);
      if (generateResponse.id) {
        const image = await Image.create({
          jobId: generateResponse.id,
          prompt: req.body.prompt,
        });
        return res.status(HttpStatusCodes.OK).send({ id: image.jobId });
      }
    } catch (err) {
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
    return res.status(HttpStatusCodes.OK).send(updatedImages);
  } catch (err) {
    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send();
  }
});

const checkJobStatus = async (jobId: string): Promise<IImage | null> => {
  return retrieveJob(jobId).then((response) => {
    if (response.status === "COMPLETED") {
      const image = Image.findOneAndUpdate(
        { jobId },
        {
          isPending: false,
          url: response.output[0].image,
        }
      );
      return image;
    } else {
      return null;
    }
  });
};

export default router;
