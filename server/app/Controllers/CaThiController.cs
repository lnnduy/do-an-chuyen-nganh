using System;
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
  [Route("api/hoc-phan/{idHocPhan}/ca-thi")]
  public class HocPhanCaThiController : ControllerBase
  {
    private readonly ICaThiService _caThiService;

    public HocPhanCaThiController(ICaThiService caThiService)
    {
      _caThiService = caThiService;
    }

    [HttpPost("")]
    public async Task<IActionResult> TaoCaThi(long idHocPhan, TaoCaThiRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _caThiService.TaoCaThi(idHocPhan, request);

      return Ok(serviceResult);
    }

    [HttpGet("")]
    public async Task<IActionResult> GetDsCaThi(long idHocPhan)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _caThiService.GetDsCaThi(idHocPhan);

      return Ok(serviceResult);
    }
  }

  [Authorize]
  [ApiController]
  [Route("api/ca-thi")]
  public class CaThiController : ControllerBase
  {
    private readonly ICaThiService _caThiService;

    public CaThiController(ICaThiService caThiService)
    {
      _caThiService = caThiService;
    }

    [HttpGet("da-nhan")]
    public IActionResult GetDsCaThiDaNhan()
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var idTaiKhoan = Convert.ToInt64(claim.Value);

      var serviceResult = _caThiService.GetDsCaThiDaNhan(idTaiKhoan);

      return Ok(serviceResult);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCaThi(long id)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _caThiService.GetCaThi(id);

      return Ok(serviceResult);
    }

    [HttpGet("{id}/thi-sinh-da-tham-gia")]
    public async Task<IActionResult> GetDsThiSinhDaThamGia(long id)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _caThiService.GetDsThiSinhDaThamGia(id);

      return Ok(serviceResult);
    }

    [HttpGet("{id}/ma-bao-ve")]
    public async Task<IActionResult> GetMaBaoVeCaThi(long id)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _caThiService.GetMaBaoVeCaThi(id);

      return Ok(serviceResult);
    }

    [HttpGet("{id}/bat-dau-ca-thi/{ticks}")]
    public async Task<IActionResult> BatDauCaThi(long id, long ticks)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var idTaiKhoan = Convert.ToInt64(claim.Value);

      var serviceResult = await _caThiService.BatDauCaThi(idTaiKhoan, id, ticks);

      return Ok(serviceResult);
    }

    [HttpGet("{id}/ket-thuc-ca-thi")]
    public async Task<IActionResult> KetThucCaThi(long id)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var idTaiKhoan = Convert.ToInt64(claim.Value);

      var serviceResult = await _caThiService.KetThucCaThi(idTaiKhoan, id);

      return Ok(serviceResult);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> CapNhatCaThi(long id, TaoCaThiRequest request)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _caThiService.CapNhatCaThi(id, request);

      return Ok(serviceResult);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> GetDsCaThi(long id)
    {
      var claim = User.Claims.FirstOrDefault(c => c.Type == "id");

      if (!User.Identity.IsAuthenticated || claim == null)
        return Unauthorized();

      var serviceResult = await _caThiService.XoaCaThi(id);

      return Ok(serviceResult);
    }
  }
}