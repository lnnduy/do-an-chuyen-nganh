using System.Collections;

namespace Server.Model.Response
{
  public class Response<T>
  {
    public bool Success { get; set; }
    public IEnumerable Errors { get; set; }
    public int StatusCode { get; set; }
    public T Data { get; set; }

    public Response(T data)
    {
      Data = data;
    }

    public Response()
    { }
  }

  public class PaginationResponse<T> : Response
  {
    public int TotalPage { get; set; }
    public int CurrentPage { get; set; }
    public T Data { get; set; }

    public PaginationResponse(T data)
    {
      Data = data;
    }

    public PaginationResponse()
    { }
  }

  public class Response
  {
    public bool Success { get; set; }
    public IEnumerable Errors { get; set; }
    public int StatusCode { get; set; }
  }
}