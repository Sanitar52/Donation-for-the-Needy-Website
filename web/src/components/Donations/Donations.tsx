
import DonationCell from 'src/components/DonationCell';

const Donations = () => {
  return (
    <div className="flex flex-col items-center mt-12">
      <h2 className="text-2xl font-semibold">Past Donations</h2>
      <DonationCell />
    </div>
  );
}

export default Donations;