using System.Collections.Generic;
using Server.Entity;
using Server.Repository;

namespace Server.Service
{
  public partial class SinhVienService : ISinhVienService
  {
    private readonly SinhVienRepository _sinhVienRepo = new SinhVienRepository();
    private readonly LopHocRepository _lopHocRepo = new LopHocRepository();
  }
}