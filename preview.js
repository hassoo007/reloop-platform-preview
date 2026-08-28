document.addEventListener('DOMContentLoaded', () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  document.documentElement.lang = 'ar';
  document.documentElement.dir = 'rtl';
  document.title = 'ريلوب | إنشاء شحنات متعددة';
  $('#page-kicker').textContent = 'الشحنات المجمعة';
  $('#page-title').textContent = 'إنشاء شحنات متعددة / اكسل';
  $('#profile-name').textContent = 'متجر روابي';
  $('#profile-role').textContent = 'نسخة معاينة';
  $('#profile-initials').textContent = 'ر';
  $$('.nav-direct, .nav-submenu a').forEach(link => link.classList.toggle('active', link.dataset.route === 'bulk'));

  $('#content').innerHTML = \`
    <section class="section create-layout individual-shipment-wizard bulk-wizard-layout">
      <aside class="create-aside wizard-stepper bulk-wizard-stepper">
        <div class="card wizard-stepper-card">
          <header><h2>الخطوات</h2></header>
          <ol aria-label="خطوات إنشاء الشحنات المتعددة">
            <li class="complete"><button type="button" tabindex="-1"><i>✓</i><span><b>نوع الشحنات</b></span></button></li>
            <li class="active"><button type="button" tabindex="-1"><i>2</i><span><b>تحميل ملف Excel</b></span></button></li>
            <li><button type="button" tabindex="-1"><i>3</i><span><b>التحقق من البيانات</b></span></button></li>
            <li><button type="button" tabindex="-1"><i>4</i><span><b>إنشاء الشحنات</b></span></button></li>
          </ol>
        </div>
      </aside>
      <div class="card card-pad wizard-form bulk-stage-column">
        <article class="wizard-stage bulk-upload-card">
          <div class="form-section-head wizard-stage-head bulk-upload-head">
            <span>02</span>
            <div><h3>رفع ملف Excel</h3><p>لخدمة التوصيل والتجار والبائعين فقط</p></div>
            <button class="ghost" type="button" disabled>السابق</button>
          </div>
          <div class="bulk-template-note">
            <p>قم بتنزيل وتعبئة نموذج الشحنات المتعددة قبل رفع الملف.</p>
            <div>
              <span>استخدام النموذج يضمن تنسيق البيانات ومعالجتها بشكل صحيح.</span>
              <a href="./templates/reloop_shipments_template.xlsx" download>⇩ تنزيل النموذج</a>
              <a href="./templates/reloop_cities.xlsx" download>⇩ تنزيل قائمة المدن</a>
            </div>
          </div>
          <div id="drop-zone" class="drop-zone">
            <div>
              <div class="drop-icon">⇧</div>
              <h3>اسحب ملف Excel هنا</h3>
              <p>ملف XLSX فقط، بحد أقصى 10 MB و1,000 صف</p>
              <div class="file-choice-actions"><button id="browse-file" class="primary" type="button">اختيار الملف</button></div>
              <input id="file-input" type="file" accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" hidden />
            </div>
          </div>
          <div id="file-pill" class="file-pill" hidden>
            <div><b id="file-name"></b><small id="file-size"></small></div>
            <button id="remove-file" class="danger" type="button">×</button>
          </div>
          <div class="upload-actions">
            <button class="ghost" type="button" disabled>✓ فحص الملف</button>
            <button class="primary" type="button" disabled>↗ إنشاء الشحنات</button>
          </div>
        </article>
        <section class="bulk-recent-uploads">
          <div class="section-head">
            <div><h2>آخر الملفات المرفوعة</h2><p>آخر النماذج التي رفعتها من الواجهة</p></div>
            <a class="ghost" href="./templates/reloop_shipments_template.xlsx" download>↓ XLSX</a>
          </div>
          <div class="card">
            <div class="empty-state"><span>⇧</span><h3>لا توجد عمليات رفع</h3><p>ستظهر الملفات هنا بعد أول عملية رفع فعلية.</p></div>
          </div>
        </section>
      </div>
    </section>\`;

  const input = $('#file-input');
  const zone = $('#drop-zone');
  const showFile = (file) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.xlsx')) {
      window.alert('يجب اختيار ملف XLSX');
      return;
    }
    $('#file-name').textContent = file.name;
    $('#file-size').textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB';
    $('#file-pill').hidden = false;
  };
  $('#browse-file').addEventListener('click', () => input.click());
  input.addEventListener('change', () => showFile(input.files[0]));
  $('#remove-file').addEventListener('click', () => {
    input.value = '';
    $('#file-pill').hidden = true;
  });
  ['dragenter', 'dragover'].forEach(name => zone.addEventListener(name, event => {
    event.preventDefault();
    zone.classList.add('drag');
  }));
  ['dragleave', 'drop'].forEach(name => zone.addEventListener(name, event => {
    event.preventDefault();
    zone.classList.remove('drag');
  }));
  zone.addEventListener('drop', event => showFile(event.dataTransfer.files[0]));
});