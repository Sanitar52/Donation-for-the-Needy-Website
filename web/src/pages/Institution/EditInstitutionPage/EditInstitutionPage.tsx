import EditInstitutionCell from 'src/components/Institution/EditInstitutionCell'

type InstitutionPageProps = {
  id: number
}

const EditInstitutionPage = ({ id }: InstitutionPageProps) => {
  return <EditInstitutionCell id={id} />
}

export default EditInstitutionPage
