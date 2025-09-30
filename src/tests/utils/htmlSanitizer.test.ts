import { sanitizeHtml } from '@/utils/htmlSanitizer';

describe('sanitizeHtml', () => {
  it('removes disallowed tags like <script>', () => {
    const input = `<p>Hello</p><script>alert('xss')</script>`;
    const out = sanitizeHtml(input);
    expect(out).toContain('<p>Hello</p>');
    expect(out).not.toContain('<script>');
    expect(out).not.toContain('alert(');
  });

  it('keeps allowed attributes and strips disallowed', () => {
    const input =
      `<a href="https://example.com" target="_blank" rel="noopener" ` +
      `onclick="steal()" data-test="x" aria-label="y">link</a>`;
    const out = sanitizeHtml(input);
    expect(out).toContain('href="https://example.com"');
    expect(out).toContain('target="_blank"');
    expect(out).toContain('rel="noopener"');
    expect(out).not.toContain('onclick=');
    expect(out).not.toContain('data-test=');
    expect(out).not.toContain('aria-label=');
    expect(out).toContain('>link</a>');
  });

  it('drops unknown attributes except those whitelisted', () => {
    const input = `<div class="x" id="y" foo="bar">content</div>`;
    const out = sanitizeHtml(input);
    expect(out).toContain('<div');
    expect(out).toContain('class="x"');
    expect(out).toContain('id="y"');
    expect(out).not.toContain('foo="bar"');
  });
});
