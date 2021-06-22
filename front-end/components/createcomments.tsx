import { useForm, Controller } from "react-hook-form";

export type FormData = {
  Description: string;
};
interface SubmitFormProps {
  HandleSubmit: (data: FormData, reset: ({ Description }: any) => void) => void;
}

function CreateComment({ HandleSubmit }: SubmitFormProps) {
  const { control, handleSubmit, reset } = useForm<FormData>();

  return (
    <div className="flex justify-center">
      <form
        className="m-4 flex"
        onSubmit={handleSubmit((data) => {
          HandleSubmit(data, reset);
        })}
      >
        <Controller
          name="Description"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <input
              type="text"
              value={value}
              onChange={onChange}
              className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
              placeholder="Enter the description of the post"
            />
          )}
          rules={{ required: true }}
        />
        <button
          type="submit"
          className="px-8 rounded-r-lg bg-blue-400 text-gray-800 font-bold p-4 uppercase border-blue-500 border-t border-b border-r"
        >
          Create Comment
        </button>
      </form>
    </div>
  );
}

export default CreateComment;
