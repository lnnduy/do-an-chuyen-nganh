using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Model.Request;
using Server.Service;

namespace Server.Controller
{
  [ApiController]
  [Route("api/public-ket-qua/ca-thi/{idCaThi}/thi-sinh/{idSinhVien}")]
  public class PublicKetQuaController : ControllerBase
  {
    private readonly IKetQuaService _ketQuaService;

    public PublicKetQuaController(IKetQuaService ketQuaService)
    {
      _ketQuaService = ketQuaService;
    }

    [HttpGet("")]
    public async Task<IActionResult> CaThi_ThiSinh(long idCaThi, long idSinhVien)
    {
      var serviceResult = await _ketQuaService.CaThi_ThiSinh(idCaThi, idSinhVien);

      return Ok(serviceResult);
    }
  }
}
