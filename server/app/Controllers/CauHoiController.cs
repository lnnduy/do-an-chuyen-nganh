using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Model.Request;
using Server.Service;

namespace Server.Controller
{
  [Authorize]
  [ApiController]
  [Route("api/kho-cau-hoi/{idKhoCauHoi}/cau-hoi")]
  public partial class CauHoiController : ControllerBase
  {
    private readonly ICauHoiService _cauHoiService;

    public CauHoiController(ICauHoiService cauHoiService)
    {
      _cauHoiService = cauHoiService;
    }

    [HttpGet("")]
    public async Task<IActionResult> GetDsCauHoi(long idKhoCauHoi)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _cauHoiService.GetDsCauHoi(idKhoCauHoi);

      return Ok(serviceResult);
    }

    [HttpPost("")]
    public async Task<IActionResult> ThemCauHoiVaoKhoCauHoi(long idKhoCauHoi, TaoCauHoiRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _cauHoiService.ThemCauHoiVaoKhoCauHoi(idKhoCauHoi, request);

      return Ok(serviceResult);
    }
  }

  [Route("api/cau-hoi/{id}")]
  public partial class CauHoiController : ControllerBase
  {
    [HttpPut("")]
    public async Task<IActionResult> GetDsCauHoi(long id, CapNhatCauHoiRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _cauHoiService.CapNhatCauHoi(id, request);

      return Ok(serviceResult);
    }

    [HttpDelete("")]
    public async Task<IActionResult> XoaCauHoi(long id)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _cauHoiService.XoaCauHoi(id);

      return Ok(serviceResult);
    }
  }
}