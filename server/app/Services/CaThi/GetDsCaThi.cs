using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Entity;
using Server.Model.Response;

namespace Server.Service
{
  public partial class CaThiService
  {
    public async Task<Response<List<CaThi>>> GetDsCaThi(long idHocPhan)
    {
      var hocPhan = await _hocPhanRepo.GetHocPhanById(idHocPhan);

      if (hocPhan == null)
        return new Response<List<CaThi>>
        {
          StatusCode = 400,
          Success = false,
          Errors = new[] { "Không tìm thấy học phần" }
        };

      var dsCaThi = _caThiRepo.GetAll(idHocPhan);

      return new Response<List<CaThi>>
      {
        StatusCode = 200,
        Success = true,
        Data = dsCaThi
      };
    }
  }
}