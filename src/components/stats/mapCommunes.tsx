import { getUserPolygons } from "@/helpers/dbutils";
import { MyMapComponent } from "../maps/map";
import { useTranslation } from '@/i18n'

async function MapCommunes({lang, user, visited}: DetailsProps) {
  /* eslint-disable react-hooks/rules-of-hooks */
  const { t } = await useTranslation(lang, 'stats')
  const {username } = user;
  const polygons = await getUserPolygons(user.id.toString());

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black p-2 m-2 sm:p-4 sm:m-4">
        <div className="">
          <h2>
            {t('usermap', {"username": username})}
          </h2>
        </div>
        <div className="text-left text-lg font-bold mb-4">
      <div className="w-full h-90 bg-orange-200 overflow-hidden">
        {polygons && <MyMapComponent departements={visited.departements} dataCommunes={polygons} showDep={true} showCom={true} tiles={"carto"} />}
      </div>
        </div>
      </div>
    </>
  )
}

export default MapCommunes;