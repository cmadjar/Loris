INSERT INTO permissions 
    (
        code, 
        description, 
        type, 
        categoryID
    ) VALUES (
        'electrophysiology_browser_view_allsites',
        'View all-sites Electrophysiology Browser pages',
        'permission',
        (SELECT ID FROM permissions_category WHERE Description='Permission')
    );

INSERT INTO permissions
    (
        code,
        description,
        type,
        categoryID
    ) VALUES (
        'electrophysiology_browser_view_site',
        'View own site Electrophysiology Browser pages',
        'permission',
        (SELECT ID FROM permissions_category WHERE Description='Permission')
    );