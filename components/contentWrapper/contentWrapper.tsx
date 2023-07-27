type contentType = {
  content: React.ReactNode,
};

export default function ContentWrapper(props: contentType) {
  return <>{props.content}</>;
}
