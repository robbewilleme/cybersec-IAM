# Use the official ASP.NET Core runtime image for version 6
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Use the official ASP.NET Core SDK image for version 6 to build the application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["TakeawayAPI/TakeawayAPI.csproj", "TakeawayAPI/"]
RUN dotnet restore "TakeawayAPI/TakeawayAPI.csproj"
COPY . .
WORKDIR "/src/TakeawayAPI"
RUN dotnet build "TakeawayAPI.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "TakeawayAPI.csproj" -c Release -o /app/publish

# Build the final runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TakeawayAPI.dll"]
