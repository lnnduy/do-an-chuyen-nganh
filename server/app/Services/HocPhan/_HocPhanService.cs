using System.Collections.Generic;
using Server.Entity;
using Server.Model.Response;
using Server.Repository;

namespace Server.Service
{
  public partial class HocPhanService : IHocPhanService
  {
    private readonly HocPhanRepository _hocPhanRepo = new HocPhanRepository();
  }
}