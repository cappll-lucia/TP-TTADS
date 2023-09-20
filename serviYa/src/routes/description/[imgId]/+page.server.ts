import { error } from "@sveltejs/kit";
import { images } from "../../../data/random_data";

export function load({ params }: any) {
  if (images.find((img) => img.img_id == params.imgId)) {
    return {
      id_img_param: params.imgId,
    };
  }
  throw error(404, "Not found");
}
