using Server.Repository;

namespace Server.Service
{
    public partial class LopHocService : ILopHocService
    {
        private readonly LopHocRepository _lopHocRepo = new LopHocRepository();
    }
}