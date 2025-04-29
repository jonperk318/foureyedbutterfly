import { accessibility, AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";


const cld = new Cloudinary({
  cloud: {
    cloudName: "difdjam1a"
  },
});

const CldImage = ({ publicId }) => {
  const myImage = cld
  .image(publicId)
  .delivery(format("auto"))
  .delivery(quality("auto"));
  return (
    <AdvancedImage
      cldImg={myImage}
      style={{ maxWidth: "100%" }}
      plugins={[lazyload(), placeholder(), accessibility()]}
    />
  );
};
export default CldImage;
