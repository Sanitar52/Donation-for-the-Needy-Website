import type {
  QueryResolvers,
  MutationResolvers,
  InstitutionRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const institutions: QueryResolvers['institutions'] = () => {
  return db.institution.findMany()
}

export const institution: QueryResolvers['institution'] = ({ id }) => {
  return db.institution.findUnique({
    where: { id },
  })
}

export const topDonatedInstitutions: QueryResolvers['topDonatedInstitutions'] = () => {
  return db.institution.findMany({
    orderBy: {
      balance: 'desc',
    },
    take: 5,
  })
}

export const createInstitution: MutationResolvers['createInstitution'] = ({
  input,
}) => {
  return db.institution.create({
    data: input,
  })
}

export const updateInstitution: MutationResolvers['updateInstitution'] = ({
  id,
  input,
}) => {
  return db.institution.update({
    data: input,
    where: { id },
  })
}

export const updateInstitutionBalance: MutationResolvers['updateInstitutionBalance'] = ({
  id,
  balance,
}) => {
  return db.institution.update({
    data: { balance },
    where: { id },
  })
}

export const deleteInstitution: MutationResolvers['deleteInstitution'] = ({
  id,
}) => {
  return db.institution.delete({
    where: { id },
  })
}

export const Institution: InstitutionRelationResolvers = {
  donations: (_obj, { root }) => {
    return db.institution.findUnique({ where: { id: root?.id } }).donations()
  },
}
