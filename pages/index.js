import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: '아름다운동해바다',
    image:
      'data:image/jpeg;base64,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',
    address: '동해 해안로 5번 국도',
    description: '3조모임분들과함께아름다운동해바다여행',
  },
  {
    id: 'm2',
    title: '멋진서해바다',
    image:
      'data:image/jpeg;base64,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',
    address: '서해 해안로 5번 국도',
    description: '5조모임분들과함께멋진서해바다여행',
  },
];

const HomePage = (props) => {
  /*const [loadedMeetups, setLoadedMeetups] = useState([]);
  /!*HTTP 요청을 보내려면 이를 처리하기 위해 일반적으로 useEffect 훅을 사용*!/
  useEffect(() => {
    /!*promise 가 완료 상태이며 응답을 받았다고 가정, 더미데이터로*!/
    setLoadedMeetups(DUMMY_MEETUPS);
  }, []);*/
  return (
    <MeetupList meetups={props.meetups} />
  ); /*props.meetups 는 아래 hetStaticProps 에 meetups 에서 온것임*/
};

//동적 렌더링
/*
export const getServerSideProps = (context) => {
  /!*context 매개 변수에서 요청 객체에 접속 할 수 있고 응답 객체가 돌아온다*!/
  const req = context.req
  const res = context.res
  return {
    props: {
      meetups: DUMMY_MEETUPS
    }
  }
}*/

//정적 렌더링
export const getStaticProps = async () => {
  /*이렇게 하면 클라이언트에서  서버 쪽으로, 정확히 하자면 빌드 프로세스 과정 쪽으로 데이터를 가져올 수 있음*/
  return {
    props: {
      meetups:
        DUMMY_MEETUPS /*DUMMY_MEETUPS 를 읽어 들이고 준비한 다음 이 페이지 컴포넌트에서 사용할 props 로 설정*/,
    },
    revalidate: 3600 /*숫자가 필요하며 숫자는 요청이 들어올때 이 페이지를 다시 생성할때까지
NextJS 가 대기하는 시간을 초단위로 표시하는것*/,
  };
};
export default HomePage;
