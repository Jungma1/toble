import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getBlog } from '../../lib/api/blog';
import BlogProfile from './BlogProfile';

function Blog() {
  const router = useRouter();
  const username = router.query.username as string;
  const { data: blog } = useQuery(['blog', username], () => getBlog(username), {
    enabled: !!username,
  });

  if (!blog) return <>Blog is not found</>;

  return (
    <Wrapper>
      <BlogProfile blog={blog} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 10rem;
`;

export default Blog;
