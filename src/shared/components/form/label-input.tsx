interface LabelInputProps {
  text: string;
}

export const LabelInput = ({ text }: LabelInputProps) => {
  return (
    <label className="label">
      <span className="label-text">{text}</span>
    </label>
  );
};
