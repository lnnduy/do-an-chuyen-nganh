using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public Response<List<CaThi>> GetDsCaThiDaNhan(long idTaiKhoan)
    {
      var dsCaThi = _caThiRepo.GetAllCaThiDaNhan(idTaiKhoan);

      return new Response<List<CaThi>>
      {
        StatusCode = 200,
        Success = true,
        Data = dsCaThi
      };
    }
  }
}