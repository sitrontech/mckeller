module Frontend::NavMenuHelper
  # draw nav menu as html list
  # key: slug for nav menu
  # to register this, go to admin -> appearance -> menus
  # (DEPRECATED)
  def get_nav_menu(key = 'main_menu', class_name = "navigation")
    debugger
    return draw_menu({menu_slug: key, container_class: class_name})

    html = "<ul class='#{class_name}'>#{_get_nav_menu(key, class_name)} #{front_editor_link(admin_appearances_nav_menus_menu_url(slug: key)) rescue ""}</ul>"
    doc = Nokogiri::HTML.fragment(html)

    link_active = doc.css("a[href='#{site_current_path}']").first
    if link_active.present?
      link_active_parent = link_active.parent
      link_active_parent['class'] += ' active'
      link_active_parent.ancestors('li').each do |parent|
        parent['class'] += ' parent-active'
      end
      html = doc.to_html
    end
    html
  end
end