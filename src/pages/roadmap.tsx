import React from 'react';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from '@/types';
import MinimalLayout from '@/layouts/_minimal';
import { useMediaQuery } from 'use-media-size';
import RoadmapSM from '@/components/roadmap/sm';
import RoadmapLG from '@/components/roadmap/lg';

const RoadmapPage: NextPageWithLayout = () => {
  const isSM = useMediaQuery('(max-width: 768px)');

  return (
    <>
      <NextSeo title="Bunzz - Roadmap" description="Bunzz - Roadmap" />
      <section className="px-10 pt-7 pb-5">
        <div className="text-center">
          <h2 className="text-5xl">Roadmap</h2>
        </div>
        <div className="mt-12 flex justify-center">
          {isSM ? <RoadmapSM /> : <RoadmapLG />}
        </div>
      </section>
    </>
  );
};

RoadmapPage.getLayout = function getLayout(page) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default RoadmapPage;
