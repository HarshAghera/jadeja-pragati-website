export default function Procedure() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-[#0f2557] mb-4">
        Procedure to Obtain Scrap Battery Import License
      </h2>
      <div className="grid md:grid-cols-3 gap-4 text-gray-800">
        <div className="bg-white border p-4 rounded shadow">
          <h4 className="font-semibold text-[#0f2557] mb-2">
            Step 1: Registration
          </h4>
          <p>
            Register with the SPCB or CPCB as a recycler/importer of hazardous
            waste.
          </p>
        </div>
        <div className="bg-white border p-4 rounded shadow">
          <h4 className="font-semibold text-[#0f2557] mb-2">
            Step 2: Application Filing
          </h4>
          <p>
            Submit an application to DGFT and Pollution Control Board with
            supporting documents.
          </p>
        </div>
        <div className="bg-white border p-4 rounded shadow">
          <h4 className="font-semibold text-[#0f2557] mb-2">
            Step 3: Review & Grant
          </h4>
          <p>
            Authorities review and issue the license, typically within 30-45
            days.
          </p>
        </div>
      </div>
    </div>
  );
}
