using PropertyNormalizerApi.Services;  
// Import the services namespace to access PropertyStore

// -------------------------
// Create the WebApplication builder
// -------------------------
var builder = WebApplication.CreateBuilder(args);

// -------------------------
// Add services to the container
// -------------------------
builder.Services.AddControllers();  
// Adds controller support (for API endpoints)

builder.Services.AddEndpointsApiExplorer();  
// Enables minimal API endpoint discovery for Swagger/OpenAPI

builder.Services.AddSwaggerGen();  
// Generates Swagger/OpenAPI documentation for your API

// -------------------------
// Configure CORS (Cross-Origin Resource Sharing)
// -------------------------
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173") // Allow requests from React dev server
              .AllowAnyHeader()  // Allow all headers
              .AllowAnyMethod(); // Allow all HTTP methods (GET, POST, PATCH, etc.)
    });
});

// -------------------------
// Add singleton in-memory store
// -------------------------
builder.Services.AddSingleton<PropertyStore>();  
// Single instance of PropertyStore shared across requests
// Ensures that all API calls access the same in-memory property dictionary

// -------------------------
// Build the application
// -------------------------
var app = builder.Build();

// -------------------------
// Enable Swagger in development mode
// -------------------------
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();       // Serve Swagger JSON endpoint
    app.UseSwaggerUI();     // Serve Swagger UI web page
}

// -------------------------
// Configure middleware
// -------------------------
app.UseHttpsRedirection(); // Redirect HTTP requests to HTTPS
app.UseAuthorization();    // Enable authorization middleware
app.UseCors();              // Enable the configured CORS policy

// -------------------------
// Map controller routes
// -------------------------
app.MapControllers();  

// -------------------------
// Run the application
// -------------------------
app.Run();
