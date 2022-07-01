import type { NextPage } from 'next';
import { GetStaticPaths, GetStaticProps } from 'next';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next/types';
import api from '../../src/api';
import { IAuthor } from 'interfaces/IAuthor';
import AuthorPage from '@pages/AuthorPage';
import getGlobalStaticProps, { IGetGlobalStaticProps } from '../../functions/getGlobalStaticProps';

const Authors: NextPage<IAuthorProps> = ({ author }) => {
  return <AuthorPage author={author} />;
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext<IAuthorPageParams>) => {
  const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const author = await api.strapi.authors.getAuthor({ id });
  if (!author)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  return await getGlobalStaticProps({
    revalidate: Number(process.env['NEXT_PUBLIC_REVALIDATE_INTERVAl']),
    props: {
      author,
    },
  });
};

// @ts-ignore
export const getStaticPaths: GetStaticPaths = async (context: GetStaticPathsContext) => {
  const { data: authors } = await api.strapi.authors.getAuthors();
  const paths = authors?.map((a: IAuthor) => ({
    params: { id: String(a.id) },
  }));
  return {
    paths,
    fallback: false,
  };
};

//Получаемые по ссылке параметры страницы
type IAuthorPageParams = {
  id: string;
};

interface IAuthorProps extends IGetGlobalStaticProps {
  author: IAuthor;
}

export default Authors;
