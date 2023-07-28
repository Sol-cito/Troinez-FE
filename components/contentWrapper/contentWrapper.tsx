type ContentType = {
  content: React.ReactNode;
};

export default function ContentWrapper(props: ContentType) {
  const { content } = props;
  return <div>{content}</div>;
}
