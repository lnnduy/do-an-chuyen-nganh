using Server.Repository;

namespace Server.Service
{
  public partial class CaThiService : ICaThiService
  {
    private readonly HocPhanRepository _hocPhanRepo = new HocPhanRepository();
    private readonly LopHocRepository _lopHocRepo = new LopHocRepository();
    private readonly DeThiRepository _deThiRepo = new DeThiRepository();
    private readonly CaThiRepository _caThiRepo = new CaThiRepository();
  }
}