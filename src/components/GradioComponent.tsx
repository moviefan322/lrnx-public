import { client } from "@gradio/client";
import "bootstrap/dist/css/bootstrap.css";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { getClient } from "@/redux/basic/basicActions";

interface GRadioProps {
  audioFile: Blob;
}

const GradioComponent: React.FC<GRadioProps> = ({ audioFile }: GRadioProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="col">
      <h2>Gradio Integration</h2>
      <button
        className="btn btn-dark btn-block mb-4 mt-3"
        onClick={() => dispatch(getClient({audioFile, selectedVoice: 'Female1'}))}
      >
        Get Client
      </button>
    </div>
  );
};

export default GradioComponent;
