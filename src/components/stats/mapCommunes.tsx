import { getUserPolygons } from "@/helpers/dbutils";
import { MyMapComponent } from "../maps/map";

async function MapCommunes({user, visited}: DetailsProps) {
  const polygons = await getUserPolygons(user.id.toString());

  return (
    <>
      <div className="bg-white rounded-lg border border-blue-200 text-left text-black sm:p-4 sm:m-4 xs:p-2 xs:m-2">
        <div className="">
          <h2 className="mb-3 text-lg font-semibold text-center">
            ▤ {user.username} communes  map ▥
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