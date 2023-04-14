export type BannerData = {
  message: string;
  state: 'success' | 'error';
};

export default function Banner({ banner: { message, state } }: { banner: BannerData }) {
  const isSuccess = state === 'success';
  const icon = isSuccess ? '✅' : '🙅';
  return (
    <p
      className={`w-full p-2 ${isSuccess ? 'bg-green-300' : 'bg-red-300'} rounded-xl text-center`}
    >{`${icon} ${message}`}</p>
  );
}
