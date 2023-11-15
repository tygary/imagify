const sdk = require("api")("@runpod/v1.0#18nw21lj8lwwiy");
import config from "../config/config";

interface GenerateResponse {
  id: string;
  status: string;
}

interface JobOutput {
  image: string;
  seed: number;
}

interface StatusResponse {
  delayTime: number;
  executionTime: number;
  id: string;
  output: JobOutput[];
  status: string;
}

const generateImage = async (prompt: string): Promise<GenerateResponse> => {
  await sdk.auth(config.runpod.apikey);
  return sdk
    .stableDiffusionV1(
      {
        input: {
          prompt,
          width: 512,
          height: 512,
          guidance_scale: 7.5,
          num_inference_steps: 50,
          num_outputs: 1,
          prompt_strength: 1,
          scheduler: "KLMS",
        },
      },
      { run_type: "run" }
    )
    .then(({ data }: { data: { id: string; status: string } }) => {
      console.log(data);
      return data;
    })
    .catch((err: any) => console.error(err));
};

const retrieveJob = async (job_id: string): Promise<StatusResponse> => {
  await sdk.auth(config.runpod.apikey);
  return sdk
    .status({ endpoint_id: "stable-diffusion-v1", job_id })
    .then(({ data }: { data: StatusResponse }) => {
      console.log(data);
      return data;
    })
    .catch((err: any) => console.error(err));
};

export { generateImage, retrieveJob, StatusResponse, GenerateResponse };
