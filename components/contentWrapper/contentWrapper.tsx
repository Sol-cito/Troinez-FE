type contentType = {
  content: React.ReactNode,
};

export default function ContentWrapper(props: contentType) {
  return <div>{props.content}</div>;
}