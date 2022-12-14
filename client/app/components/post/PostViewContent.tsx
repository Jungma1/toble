import styled from '@emotion/styled';
import { editorStyles } from '../../lib/styles';

interface Props {
  content: string;
}

function PostViewContent({ content }: Props) {
  return (
    <Section>
      <Content dangerouslySetInnerHTML={{ __html: content }} />
    </Section>
  );
}

const Section = styled.section`
  margin-top: 4rem;
  position: relative;
`;

const Content = styled.div`
  ${editorStyles}

  img {
    display: block;
    max-width: 100%;
  }
`;

export default PostViewContent;
