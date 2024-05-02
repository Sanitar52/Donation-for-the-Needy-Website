import { Link, routes } from '@redwoodjs/router';
import { gql, useMutation } from '@redwoodjs/web';
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';
import { timeTag } from 'src/lib/formatters';
import type { FindDonationsQuery, DeleteDonationMutation, DeleteDonationMutationVariables } from 'types/graphql';

export const QUERY = gql`
  query FindDonationsQuery {
    donations {
      id
      amount
      donationDate
      paymentMethod
      paymentStatus
      institution {
        name
      }
      user {
        name
      }
      userBank {
        name
      }
    }
  }
`;


const DELETE_DONATION_MUTATION = gql`
  mutation DeleteDonationMutation($id: Int!) {
    deleteDonation(id: $id) {
      id
    }
  }
`;
export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>No donations found.</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
);

export const Success = ({ donations }: CellSuccessProps<FindDonationsQuery>) => {
  const [openDropdownId, setOpenDropdownId] = React.useState<string | null>(null);
  const [deleteDonation] = useMutation(DELETE_DONATION_MUTATION, {
    onCompleted: () => {
      toast.success('Donation deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },

    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const onDeleteClick = (id: DeleteDonationMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete donation ' + id + '?')) {
      deleteDonation({ variables: { id } })
    }
  }
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              User Name
            </th>
            <th scope="col" className="px-6 py-3">
              Donation Amount
            </th>
            <th scope="col" className="px-6 py-3">
              User Bank

            </th>
            <th scope="col" className="px-6 py-3">
              Institution Name

            </th>
            <th scope="col" className="px-6 py-3">
              Donation Date
            </th>
            <th scope="col" className="px-6 py-3">
              &nbsp;
            </th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {donation.id}
              </td>
              <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-sm text-gray-500">
                {donation.user.name}
              </th>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {donation.amount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {donation.userBank.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {donation.institution.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {timeTag(donation.donationDate)}
              </td>
              <td className="px-4 py-3 flex items-center justify-end">
              <nav className="rw-table-actions">
                  <Link
                  to={routes.institution({ id: donation.id })}
                  title={'Show donation ' + donation.id + ' detail'}
                  className="rw-button rw-button-small"
                  >
                  Details
                </Link>
                  <button
                    type="button"
                    title={'Delete donation ' + donation.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(donation.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};