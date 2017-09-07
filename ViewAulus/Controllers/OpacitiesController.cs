using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Web;
using System.Web.Mvc;
using PlasticManufacturer.Domain.Entities.Common;
using PlasticManufacturer.InfraStructure.Context;

namespace ViewAulus.Controllers
{
    public class OpacitiesController : Controller
    {
        private PlasticManufacturerContext db = new PlasticManufacturerContext();

        // GET: Opacities
        public async Task<ActionResult> Index()
        {
            return View(await db.Opacities.ToListAsync());
        }

        // GET: Opacities/Details/5
        public async Task<ActionResult> Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Opacity opacity = await db.Opacities.FindAsync(id);
            if (opacity == null)
            {
                return HttpNotFound();
            }
            return View(opacity);
        }

        // GET: Opacities/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Opacities/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create([Bind(Include = "Id,Name,Description,CreationDate,LastUpdate")] Opacity opacity)
        {
            if (ModelState.IsValid)
            {
                db.Opacities.Add(opacity);
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }

            return View(opacity);
        }

        // GET: Opacities/Edit/5
        public async Task<ActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Opacity opacity = await db.Opacities.FindAsync(id);
            if (opacity == null)
            {
                return HttpNotFound();
            }
            return View(opacity);
        }

        // POST: Opacities/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit([Bind(Include = "Id,Name,Description,CreationDate,LastUpdate")] Opacity opacity)
        {
            if (ModelState.IsValid)
            {
                db.Entry(opacity).State = EntityState.Modified;
                await db.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(opacity);
        }

        // GET: Opacities/Delete/5
        public async Task<ActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Opacity opacity = await db.Opacities.FindAsync(id);
            if (opacity == null)
            {
                return HttpNotFound();
            }
            return View(opacity);
        }

        // POST: Opacities/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> DeleteConfirmed(int id)
        {
            Opacity opacity = await db.Opacities.FindAsync(id);
            db.Opacities.Remove(opacity);
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
