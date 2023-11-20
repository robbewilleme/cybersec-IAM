namespace TakeawayAPI
{
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Http;
    using System.Threading.Tasks;

    public class AccessTokenValidationMiddleware
    {
        private readonly RequestDelegate _next;

        public AccessTokenValidationMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            // Extract the access token from the Authorization header
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (string.IsNullOrEmpty(token))
            {
                context.Response.StatusCode = 401; // Unauthorized
                await context.Response.WriteAsync("Access token is missing.");
                return;
            }

            // Continue with the next middleware in the pipeline
            await _next(context);
        }

    }

    public static class AccessTokenValidationMiddlewareExtensions
    {
        public static IApplicationBuilder UseAccessTokenValidation(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AccessTokenValidationMiddleware>();
        }
    }

}
