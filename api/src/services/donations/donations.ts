import type {
  QueryResolvers,
  MutationResolvers,
  DonationRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const donations: QueryResolvers['donations'] = () => {
  return db.donation.findMany({})
}

export const donation: QueryResolvers['donation'] = ({ id }) => {
  return db.donation.findUnique({
    where: { id },
  })
}

export const recentDonations: QueryResolvers['recentDonations'] = () => {
  return db.donation.findMany({
    include: { user: true, institution: true},
    orderBy: {
      donationDate: 'desc',
    },
    take: 5,
  })
}

export const createDonation: MutationResolvers['createDonation'] = ({
  input,
}) => {
  return db.donation.create({
    data: input,
  })
}

export const updateDonation: MutationResolvers['updateDonation'] = ({
  id,
  input,
}) => {
  return db.donation.update({
    data: input,
    where: { id },
  })
}

export const deleteDonation: MutationResolvers['deleteDonation'] = ({ id }) => {
  return db.donation.delete({
    where: { id },
  })
}

export const Donation: DonationRelationResolvers = {
  institution: (_obj, { root }) => {
    return db.donation.findUnique({ where: { id: root?.id } }).institution()
  },
  user: (_obj, { root }) => {
    return db.donation.findUnique({ where: { id: root?.id } }).user()
  },
  userBank: (_obj, { root }) => {
    return db.donation.findUnique({ where: { id: root?.id } }).userBank()
  },
}
