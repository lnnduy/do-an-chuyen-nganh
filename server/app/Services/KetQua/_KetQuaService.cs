using Server.Repository;

namespace Server.Service
{
  public partial class KetQuaService : IKetQuaService
  {
    private readonly BaiLamRepository _baiLamRepo = new BaiLamRepository();
    private readonly CaThiRepository _caThiRepo = new CaThiRepository();
    private readonly DeThiRepository _deThiRepo = new DeThiRepository();
    private readonly CauHoiRepository _cauHoiRepo = new CauHoiRepository();
    private readonly DapAnRepository _dapAnRepo = new DapAnRepository();
    private readonly SinhVienRepository _sinhVienRepo = new SinhVienRepository();
    private readonly ThiSinhRepository _thiSinhRepo = new ThiSinhRepository();
  }
}