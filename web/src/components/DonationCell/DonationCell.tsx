import { Link, routes } from '@redwoodjs/router';
import { gql, useMutation } from '@redwoodjs/web';
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';
import { timeTag } from 'src/lib/formatters';
import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import type { FindDonationsQuery, DeleteDonationMutation, DeleteDonationMutationVariables } from 'types/graphql';

// Define your query
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
        isActive
      }
      user {
        name
        isActive
      }
      userBank {
        name
        isActive
      }
    }
  }
`;

// Define your mutation
const DELETE_DONATION_MUTATION = gql`
  mutation DeleteDonationMutation($id: Int!) {
    deleteDonation(id: $id) {
      id
    }
  }
`;

// Loading component
export const Loading = () => <div>Loading...</div>;

// Empty component
export const Empty = () => <div>No donations found.</div>;

// Failure component
export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
);

// Success component with the Material-UI table
export const Success = ({ donations }: CellSuccessProps<FindDonationsQuery>) => {
  const [globalFilter, setGlobalFilter] = useState('');

  type Donation = NonNullable<FindDonationsQuery['donations']>[0];

  const columns: MRT_ColumnDef<Donation>[] = useMemo(
    () => [
      {
        header: 'ID',
        accessorKey: 'id',
      },
      {
        header: 'User Name',
        accessorKey: 'user.name',
      },
      {
        header: 'Donation Amount',
        accessorKey: 'amount',
        Cell: ({ cell }) => cell.getValue().toLocaleString(),
      },
      {
        header: 'User Bank',
        accessorKey: 'userBank.name',
      },
      {
        header: 'Institution Name',
        accessorKey: 'institution.name',
      },
      {
        header: 'Donation Date',
        accessorKey: 'donationDate',
        Cell: ({ cell }) => timeTag(cell.getValue()),
      },
      {
        header: '',
        accessorKey: 'id',
        Cell: ({ cell }) => (
          <nav className="rw-table-actions">
            <button
              type="button"
              title={'Delete donation ' + cell.getValue()}
              className="rw-button rw-button-small rw-button-red"
              onClick={() => onDeleteClick(cell.getValue())}
            >
              Delete
            </button>
          </nav>
        ),
      },
    ],
    []
  );

  const [deleteDonation] = useMutation(DELETE_DONATION_MUTATION, {
    onCompleted: () => {
      toast.success('Donation deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id: DeleteDonationMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete donation ' + id + '?')) {
      deleteDonation({ variables: { id } });
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: donations,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      showColumnFilters: false,
    },
  });

  return (
    <div className="">
      <div className="mb-12">
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <MaterialReactTable table={table} />
      </div>

    </div>
  );
};
