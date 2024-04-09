import InstitutionCell from 'src/components/Institution/InstitutionCell'

type InstitutionPageProps = {
  id: number
}

const InstitutionPage = ({ id }: InstitutionPageProps) => {
  return <InstitutionCell id={id} />
}

export default InstitutionPage
