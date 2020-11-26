using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public async Task<Response<List<CaThi>>> GetDsCaThiSanSang(long idSinhVien)
    {
      var dsCaThi = await _caThiRepo.GetAllCaThiSanSang(idSinhVien);

      return new Response<List<CaThi>>
      {
        StatusCode = 200,
        Success = true,
        Data = dsCaThi
      };
    }
  }
}