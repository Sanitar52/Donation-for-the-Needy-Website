
import { Link, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import Donations from 'src/components/Donations';

const PastDonationsPage = () => {
  return (
    <>
      <Metadata title="Past Donations" description="List of all past donations" />
      <div className="min-h-screen bg-yellow-500">
      <div className="max-w-full mx-auto rounded-full">
          <div className="bg-white p-6 rounded-lg shadow-2xl ">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Past Donations</h2>
          </div>
        </div>
      <Donations />
      </div>
    </>
  );
}

export default PastDonationsPage;