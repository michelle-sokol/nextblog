import type { NextPage } from 'next';
import { GetStaticProps } from 'next';

import api from '../src/api';
import PostPage from '@pages/PostPage';
import getGlobalStaticProps, { IGetGlobalStaticProps } from '../functions/getGlobalStaticProps';

const PrivacyPolicy: NextPage<IPrivacyPolicyProps> = ({ content, title }) => {
  return <PostPage title={title}>{content}</PostPage>;
};

export const getStaticProps: GetStaticProps = async () => {
  const content = await api.strapi.single.getPrivacyPolicy();
  const title = 'Соглашение об использовании Cookies';
  return await getGlobalStaticProps({
    revalidate: Number(process.env['NEXT_PUBLIC_REVALIDATE_INTERVAl']),
    props: {
      title,
      content,
    },
  });
};

interface IPrivacyPolicyProps extends IGetGlobalStaticProps {
  content: any;
  title: string;
}

export default PrivacyPolicy;
