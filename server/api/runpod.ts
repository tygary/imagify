import axios from "axios";
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
  delayTime?: number;
  executionTime?: number;
  id: string;
  output?: JobOutput[];
  status: string;
}

const generateImage = async (prompt: string): Promise<GenerateResponse> => {
  const options = {
    method: "POST",
    url: "https://api.runpod.ai/v2/stable-diffusion-v1/run",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: config.runpod.apikey,
    },
    data: {
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
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      return response.data as GenerateResponse;
    })
    .catch(function (error) {
      console.error(error);
      return { id: "", status: "error" };
    });
};

const retrieveJob = async (job_id: string): Promise<StatusResponse> => {
  const options = {
    method: "POST",
    url: `https://api.runpod.ai/v2/stable-diffusion-v1/status/${job_id}`,
    headers: {
      accept: "application/json",
      authorization: config.runpod.apikey,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      return response.data as StatusResponse;
    })
    .catch(function (error) {
      console.error(error);
      return {
        id: "",
        status: "error",
      };
    });
};

export { generateImage, retrieveJob, StatusResponse, GenerateResponse };
