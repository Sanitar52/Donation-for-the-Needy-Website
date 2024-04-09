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
