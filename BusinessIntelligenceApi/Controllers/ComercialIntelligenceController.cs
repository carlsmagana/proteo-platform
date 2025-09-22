using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BusinessIntelligenceApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ComercialIntelligenceController : ControllerBase
    {
        [HttpGet("dashboard")]
        public IActionResult GetDashboard()
        {
            var data = new
            {
                salesMetrics = new
                {
                    totalSales = 1250000,
                    monthlyGrowth = 15.3,
                    topProducts = new[]
                    {
                        new { name = "Product A", sales = 350000 },
                        new { name = "Product B", sales = 280000 },
                        new { name = "Product C", sales = 220000 }
                    }
                },
                customerMetrics = new
                {
                    totalCustomers = 5420,
                    newCustomers = 342,
                    customerRetention = 87.5
                },
                marketAnalysis = new
                {
                    marketShare = 23.8,
                    competitorAnalysis = new[]
                    {
                        new { competitor = "Competitor A", marketShare = 18.5 },
                        new { competitor = "Competitor B", marketShare = 16.2 },
                        new { competitor = "Competitor C", marketShare = 12.8 }
                    }
                }
            };

            return Ok(data);
        }

        [HttpGet("reports")]
        public IActionResult GetReports()
        {
            var reports = new[]
            {
                new { id = 1, title = "Monthly Sales Report", date = "2025-01-20", type = "Sales" },
                new { id = 2, title = "Customer Acquisition Analysis", date = "2025-01-18", type = "Customer" },
                new { id = 3, title = "Market Trends Q1 2025", date = "2025-01-15", type = "Market" },
                new { id = 4, title = "Product Performance Review", date = "2025-01-12", type = "Product" }
            };

            return Ok(reports);
        }

        [HttpGet("analytics")]
        public IActionResult GetAnalytics()
        {
            var analytics = new
            {
                salesTrends = new[]
                {
                    new { month = "Jan", sales = 980000 },
                    new { month = "Feb", sales = 1050000 },
                    new { month = "Mar", sales = 1120000 },
                    new { month = "Apr", sales = 1250000 }
                },
                customerSegmentation = new
                {
                    enterprise = 35,
                    midMarket = 45,
                    smallBusiness = 20
                },
                revenueByRegion = new[]
                {
                    new { region = "North America", revenue = 650000 },
                    new { region = "Europe", revenue = 380000 },
                    new { region = "Asia Pacific", revenue = 220000 }
                }
            };

            return Ok(analytics);
        }
    }
}
