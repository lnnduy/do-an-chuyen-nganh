using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Server.Model.Request;
using Server.Model.Response;
using Server.Repository;
using SimpleHashing.Net;

namespace Server.Service
{
  public partial class TaiKhoanService : ITaiKhoanService
  {
    private readonly TaiKhoanRepository _taiKhoanRepo = new TaiKhoanRepository();
    private readonly IConfiguration _config;

    public TaiKhoanService(IConfiguration config)
    {
      _config = config;
    }
  }
}