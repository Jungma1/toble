import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Post } from '../../lib/api/types';
import { black } from '../../lib/styles/palette';
import { formatDate } from '../../lib/utils';
import BookmarkIconButton from '../icon/BookmarkIconButton';
import { CopyLinkIcon, DotIcon } from '../icon/vector';
import { useToggle } from '../../hooks/useToggle';
import MenuExpander from '../system/MenuExpander';
import MenuExpanderItem from '../system/MenuExpanderItem';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userState } from '../../atoms/userState';

interface Props {
  post: Post;
}

function PostViewHeader({ post }: Props) {
  const router = useRouter();
  const user = useRecoilValue(userState);
  const { isToggle, handleClickToggle } = useToggle();

  const handleClickCopyURL = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('링크를 클립보드에 복사했어요!');
  };

  const handleClickEditor = () => {
    router.push(`/write?id=${post.id}`);
  };

  const handleClickDelete = () => {
    console.log('delete post test');
  };

  return (
    <Section>
      <Title>{post.title}</Title>
      <Box>
        <Profile>
          <Link href={`/@${post.writer.username}`}>
            <Anchor>
              <Image
                src={post.writer.profileImageUrl}
                width={42}
                height={42}
                objectFit='cover'
                alt=''
              />
            </Anchor>
          </Link>
          <Info>
            <DisplayName>{post.writer.displayName}</DisplayName>
            <CreatedAt>{formatDate(post.createdAt)}</CreatedAt>
          </Info>
        </Profile>
        <Service>
          <BookmarkIconButton size={20} isActive={false} />
          <CopyLinkIcon onClick={handleClickCopyURL} />
          {post.writer.id === user?.id && <DotIcon onClick={handleClickToggle} />}
        </Service>
      </Box>
      <MenuExpander isOpen={isToggle}>
        <MenuExpanderItem title='수정하기' onClick={handleClickEditor} />
        <MenuExpanderItem title='삭제하기' onClick={handleClickDelete} />
      </MenuExpander>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin: 0;
  word-break: break-all;
  color: ${black[800]};
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
`;

const Anchor = styled.a`
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
  }
`;

const Info = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  font-weight: bold;
`;

const DisplayName = styled.span`
  color: ${black[800]};
  font-size: 0.875rem;
`;

const CreatedAt = styled.span`
  color: ${black[500]};
  font-size: 0.75rem;
`;

const Service = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  svg {
    color: ${black[500]};
    cursor: pointer;
  }
`;

export default PostViewHeader;
