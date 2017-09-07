using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PlasticManufacturer.Domain.Entities.Color_Match_Request;
using PlasticManufacturer.InfraStructure.Context;

namespace ViewAulus.Controllers
{
    public class ColorMatchRequestsController : Controller
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: ColorMatchRequests
        public async Task<ActionResult> Index()
        {
            return View(await db.ColorMatchRequests.ToListAsync());
        }

        // GET: ColorMatchRequests/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ColorMatchRequest colorMatchRequest = await db.ColorMatchRequests.FindAsync(id);
            if (colorMatchRequest == null)
            {
                return HttpNotFound();
            }
            return View(colorMatchRequest);
        }

        // GET: ColorMatchRequests/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ColorMatchRequests/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(ColorMatchRequest colorMatchRequest)
        {
            db.ColorMatchRequests.Add(colorMatchRequest);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        // GET: ColorMatchRequests/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ColorMatchRequest colorMatchRequest = await db.ColorMatchRequests.FindAsync(id);
            if (colorMatchRequest == null)
            {
                return HttpNotFound();
            }
            return View(colorMatchRequest);
        }

        // POST: ColorMatchRequests/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(ColorMatchRequest colorMatchRequest)
        {
                db.Entry(colorMatchRequest).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
        }

        // GET: ColorMatchRequests/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ColorMatchRequest colorMatchRequest = await db.ColorMatchRequests.FindAsync(id);
            if (colorMatchRequest == null)
            {
                return HttpNotFound();
            }
            return View(colorMatchRequest);
        }

        // POST: ColorMatchRequests/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            ColorMatchRequest colorMatchRequest = await db.ColorMatchRequests.FindAsync(id);
            db.ColorMatchRequests.Remove(colorMatchRequest);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
